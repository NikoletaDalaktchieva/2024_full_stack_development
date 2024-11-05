import { render, screen } from '@testing-library/react';
import CreateBlog from './CreateBlog';
import userEvent from '@testing-library/user-event'



describe('<CreateBlog />', () => { 

    test('create blog', async () => {
        const createBlog = vi.fn();
        const user = userEvent.setup()


        const { container } = render(
            <CreateBlog createBlog={createBlog} user={user}/>
        );

        const title = container.querySelector('#title-input')
        const author = container.querySelector('#author-input')
        const url = container.querySelector('#url-input')
        const sendButton = screen.getByText('create')

        await user.type(title, 'test title')
        await user.type(author, 'test author')
        await user.type(url, 'test url')
        await user.click(sendButton)

        expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0][0].title).toBe('test title')
        expect(createBlog.mock.calls[0][0].author).toBe('test author')
        expect(createBlog.mock.calls[0][0].url).toBe('test url')
    });

})
