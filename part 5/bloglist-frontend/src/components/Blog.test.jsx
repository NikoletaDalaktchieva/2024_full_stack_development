import { render, screen } from '@testing-library/react';
import Blog from './Blog';
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
    const blog = {
        id: '123',
        title: 'Test Title',
        author: 'Test Author',
        url: 'http://test.com',
        likes: 420,
        user: { id: 'user123', name: 'User Test' },
      };
    

    test('renders blog content', () => {
        const mockUpdateBlog = vi.fn();
        const mockDeleteBlog = vi.fn();


        const { container } = render(
            <Blog blog={blog} updateBlog={mockUpdateBlog} deleteBlog={mockDeleteBlog} />
        );


        const div = container.querySelector('.blogStyle')
        expect(div).toHaveTextContent(
            `${blog.title} ${blog.author}`
        )
   
        const details = container.querySelector('.blogDetails')
        expect(details).toHaveStyle('display: none')


        const url = screen.getByText(blog.url)
        expect(details).toContainElement(url)

        const likes = screen.getByText(`likes ${blog.likes}`)
        expect(details).toContainElement(likes)
    });


    test('show blog details', async () => {
        const mockUpdateBlog = vi.fn();
        const mockDeleteBlog = vi.fn();

        const { container } = render(
            <Blog blog={blog} updateBlog={mockUpdateBlog} deleteBlog={mockDeleteBlog} />
        );

        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)

        expect(button).toHaveStyle('display: none')

        const details = container.querySelector('.blogDetails')
        expect(details).not.toHaveStyle('display: none')

        const url = screen.getByText(blog.url)
        expect(details).toContainElement(url)

        const likes = screen.getByText(`likes ${blog.likes}`)
        expect(details).toContainElement(likes)
    });

    test('double click on like button', async () => {
        const mockUpdateBlog = vi.fn();
        const mockDeleteBlog = vi.fn();

        render(
            <Blog blog={blog} updateBlog={mockUpdateBlog} deleteBlog={mockDeleteBlog} />
        );

        const user = userEvent.setup()
        const button = screen.getByText('like')
        await user.click(button)
        await user.click(button)

        expect(mockUpdateBlog.mock.calls).toHaveLength(2)
    });

})
