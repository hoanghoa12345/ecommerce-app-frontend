export const convertFromRes = (dataRes) => {
  return {
    name: dataRes.user.name,
    email: dataRes.user.email,
    roles: dataRes.user.roles,
    token: dataRes.token,
  };
};
