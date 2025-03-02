// Copyright 2023-2024 LightDotSo.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

pub(crate) mod error;
pub(crate) mod list;
pub(crate) mod types;

use crate::state::AppState;
use autometrics::autometrics;
use axum::{routing::get, Router};

pub(crate) use list::{
    __path_v1_operation_list_count_handler, __path_v1_operation_list_handler,
    v1_operation_list_count_handler, v1_operation_list_handler,
};

// -----------------------------------------------------------------------------
// Router
// -----------------------------------------------------------------------------

#[autometrics]
pub(crate) fn router() -> Router<AppState> {
    Router::new()
        .route("/operation/list", get(v1_operation_list_handler))
        .route("/operation/list/count", get(v1_operation_list_count_handler))
}
