// Copyright (C) 2023 Light, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

use super::types::ProtocolGroup;
use crate::{
    constants::KAKI_USER_ID, error::RouteError, result::AppJsonResult,
    routes::protocol_group::error::ProtocolGroupError, sessions::get_user_id, state::AppState,
};
use autometrics::autometrics;
use axum::{
    extract::{Query, State},
    Json,
};
use lightdotso_prisma::{protocol, protocol_group};
use lightdotso_tracing::tracing::info;
use serde::Deserialize;
use tower_sessions_core::Session;
use utoipa::IntoParams;

// -----------------------------------------------------------------------------
// Query
// -----------------------------------------------------------------------------

#[derive(Debug, Deserialize, Default, IntoParams)]
#[serde(rename_all = "snake_case")]
#[into_params(parameter_in = Query)]
pub struct PostQuery {
    /// The id of the protocol id to post for.
    protocol_id: String,
    /// The optional id of the protocol group.
    group_id: Option<String>,
}

// -----------------------------------------------------------------------------
// Handler
// -----------------------------------------------------------------------------

/// Create a protocol group
#[utoipa::path(
        post,
        path = "/protocol/group/create",
        params(
            PostQuery
        ),
        responses(
            (status = 200, description = "Protocol group created successfully", body = ProtocolGroup),
            (status = 500, description = "Protocol group internal error", body = ProtocolGroupError),
        )
    )]
#[autometrics]
pub(crate) async fn v1_protocol_group_create_handler(
    post_query: Query<PostQuery>,
    State(state): State<AppState>,
    mut session: Session,
) -> AppJsonResult<ProtocolGroup> {
    // -------------------------------------------------------------------------
    // Session
    // -------------------------------------------------------------------------

    // Get the authenticated user id.
    let auth_user_id = get_user_id(&mut session)?;
    info!(?auth_user_id);

    // -------------------------------------------------------------------------
    // Authorization
    // -------------------------------------------------------------------------

    // If the authenticated user id is not `KAKI_USER_ID`, return an error.
    if auth_user_id != KAKI_USER_ID.to_string() {
        return Err(RouteError::ProtocolGroupError(ProtocolGroupError::Unauthorized(format!(
            "Not authorized for {}",
            auth_user_id
        )))
        .into());
    }

    // -------------------------------------------------------------------------
    // Parse
    // -------------------------------------------------------------------------

    // Get the post query.
    let Query(query) = post_query;

    // Get the protocol id from the post query.
    let protocol_id = query.protocol_id;

    // Get the optional group id from the post query.
    let group_id = query.group_id;

    // -------------------------------------------------------------------------
    // DB
    // -------------------------------------------------------------------------

    // If the group id is `None`, create a new protocol group.
    let protocol_group = match group_id {
        Some(id) => {
            // Get the protocol group by id.
            state
                .client
                .protocol_group()
                .find_unique(protocol_group::id::equals(id.clone()))
                .exec()
                .await?
                .ok_or_else(|| {
                    RouteError::ProtocolGroupError(ProtocolGroupError::NotFound(format!(
                        "Protocol group not found by id: {}",
                        id
                    )))
                })?
        }
        None => {
            // Create a new protocol group.
            state.client.protocol_group().create(vec![]).exec().await?
        }
    };

    // Find the protocol by id.
    let protocol = state
        .client
        .protocol()
        .find_unique(protocol::id::equals(protocol_id.clone()))
        .exec()
        .await?
        .ok_or_else(|| {
            RouteError::ProtocolGroupError(ProtocolGroupError::NotFound(format!(
                "Protocol not found by id: {}",
                protocol_id
            )))
        })?;

    // If the group is already in the toke, return an error.
    if protocol.group_id.is_some() {
        return Err(RouteError::ProtocolGroupError(ProtocolGroupError::BadRequest(
            "Protocol already in group".to_string(),
        ))
        .into());
    }

    // Add the protocol to the protocol group.
    let protocol_group = state
        .client
        .protocol_group()
        .update(
            protocol_group::id::equals(protocol_group.id),
            vec![protocol_group::protocols::connect(vec![protocol::id::equals(protocol_id)])],
        )
        .exec()
        .await?;

    // -------------------------------------------------------------------------
    // Return
    // -------------------------------------------------------------------------

    // Change the protocol group to the format that the API expects.
    let protocol_group: ProtocolGroup = protocol_group.into();

    Ok(Json::from(protocol_group))
}
