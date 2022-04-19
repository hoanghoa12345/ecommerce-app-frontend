export const convertUserFromRes = (dataRes) => {
  return {
    id: dataRes.user.id,
    name: dataRes.user.name,
    email: dataRes.user.email,
    roles: dataRes.user.roles,
    token: dataRes.token,
  };
};
