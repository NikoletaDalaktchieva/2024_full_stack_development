const loginWith = async (page, username, password) => {
  await page.getByTestId("username").fill(username);
  await page.getByTestId("password").fill(password);
  await page.getByRole("button", { name: "login" }).click();
};

const createUser = async (request, name, username, password) => {
  await request.post("http://localhost:3001/api/users", {
    data: {
      name: name,
      username: username,
      password: password,
    },
  });
};

const createBlog = async (page, title, author, url) => {
  await page.getByRole("button", { name: "new blog" }).click();

  await page.getByTestId("title-input").fill(title);
  await page.getByTestId("author-input").fill(author);
  await page.getByTestId("url-input").fill(url);

  await page.getByRole("button", { name: "create" }).click();
};

const likeBlog = async (page) => {
  await page.getByRole("button", { name: "view" }).click();
  await page.getByRole("button", { name: "like" }).click();
};

export { loginWith, createBlog, likeBlog, createUser };
