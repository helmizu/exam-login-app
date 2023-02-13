export const setUser = (user) => {
  const userStringify = JSON.stringify(user);
  localStorage.setItem('USER_AUTH', userStringify);
}

export const getUser = () => {
  const user = localStorage.getItem('USER_AUTH');
  if (!user) return null;
  const userJSON = JSON.parse(user);
  return userJSON;
}

export const deleteUser = () => {
  localStorage.removeItem('USER_AUTH');
}

