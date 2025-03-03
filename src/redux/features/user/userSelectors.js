export const selectUser = state => state.user;
export const selectUserToken = state => state.user.token;
export const selectUserIsLoading = state => state.user.isLoading;
export const selectUserError = state => state.user.loginError;

export const selectUserInfo = state => state.user.userInfo;
export const selectUserInfoError = state => state.user.userInfoError;
