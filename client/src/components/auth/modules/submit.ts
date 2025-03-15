export const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  console.log("submit", formData);
  // await signInUser(providerMap[0], formData);
};
