const { test, expect, describe, beforeEach } = require("@playwright/test");
const { loginWith, createBlog, likeBlog, createUser } = require("./helper");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3001/api/testing/reset");
    createUser(request, "Test name", "test", "test");
    createUser(request, "Test name 2", "username2", "password2");
    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    const username = await page.getByText("username");
    const password = await page.getByText("password");

    await expect(username).toBeVisible();
    await expect(password).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      loginWith(page, "test", "test");

      await page.waitForSelector("text=blogs");
      await expect(page.getByText("blogs")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByTestId("username").fill("wrong");
      await page.getByTestId("password").fill("wrong");
      await page.getByRole("button", { name: "login" }).click();

      await expect(page.getByText("wrong username or password")).toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      loginWith(page, "test", "test");
      await page.waitForSelector("text=blogs");
    });

    test("a new blog can be created", async ({ page }) => {
      await createBlog(page, "test title", "test author", "test url");
      await expect(
        page.getByText("a new blog test title by test author added")
      ).toBeVisible();
    });

    describe("When logged in", () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, "test title", "test author", "test url");
      });

      test("like a blog", async ({ page }) => {
        await likeBlog(page);
        await expect(page.getByText("likes 1")).toBeVisible();
      });

      test("delete a blog", async ({ page }) => {
        await page.getByRole("button", { name: "view" }).click();

        page.on("dialog", (dialog) => dialog.accept());
        await page.getByRole("button", { name: "remove" }).click();

        await expect(
          page.getByText("test title test author")
        ).not.toBeVisible();
      });
    });
  });

  test("only creator can remove blog", async ({ page }) => {
    await loginWith(page, "test", "test");
    await createBlog(page, "test title", "test author", "test url");
    await page.getByRole("button", { name: "logout" }).click();
    await loginWith(page, "username2", "password2");

    await page.getByRole("button", { name: "view" }).click();
    await expect(
      page.getByRole("button", { name: "remove" })
    ).not.toBeVisible();
  });

  test("blogs order right", async ({ page }) => {
    loginWith(page, "test", "test");

    await createBlog(page, "test title", "test author", "test url");

    await createBlog(page, "test 2", "test author 2", "test url 2");
    await page.getByRole("button", { name: "view" }).nth(1).click();
    await page.getByRole("button", { name: "like" }).click();
    await page.getByRole("button", { name: "like" }).click();

    const page1 = await page.locator(".blogStyle").nth(0);
    await expect(page1).toContainText("test 2 test author 2");
  });
});
