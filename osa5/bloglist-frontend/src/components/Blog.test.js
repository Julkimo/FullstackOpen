import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('Title and author are rendered, url and likes are not', () => {
    const blog = {
        title: 'Testaus on persikkaviljelijöiden touhua',
        author: 'Riikka Raakalainen',
        url: 'www.pers_ikka.fi',
        likes: 12,
        user: '62ff644201ac4825a12e3b21'
    }

    const { container } = render(<Blog blog={blog} />)
    const div = container.querySelector('.blog')

    test('title + author is rendered', () => {
        expect(div).toHaveTextContent('Testaus on persikkaviljelijöiden touhua by Riikka Raakalainen')
    })

    test('likes is not rendered', () => {
        const shouldBeFalsy = expect(div).toHaveTextContent('Likes: 12')
        expect(shouldBeFalsy).toBeFalsy()
    })

    test('url is not rendered', () => {
        const shouldBeFalsy = expect(div).toHaveTextContent('Url: www.pers_ikka.fi')
        expect(shouldBeFalsy).toBeFalsy()
    })
})

describe('When view is pressed url and likes are rendered', () => {
    const blog = {
        title: 'Testaus on persikkaviljelijöiden touhua',
        author: 'Riikka Raakalainen',
        url: 'www.pers_ikka.fi',
        likes: 12,
        user: '62ff644201ac4825a12e3b21'
    }

    let container

    beforeEach(() => {
        container = render(<Blog blog={blog}/>).container
    })
    
    test('Url is rendered', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)
        const div = container.querySelector('.url')
        expect(div).not.toHaveStyle('display: none')
    })

    test('Likes are rendered', async () => {        
        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)
        const div = container.querySelector('.likes')
        expect(div).not.toHaveStyle('display: none')
    })
})

describe('Clicking the like button twice calls the like handler two times', () => {
    const blog = {
        title: 'Testaus on persikkaviljelijöiden touhua',
        author: 'Riikka Raakalainen',
        url: 'www.pers_ikka.fi',
        likes: 12,
        user: '62ff644201ac4825a12e3b21'
    }

    test('please', async () => {
        const mockHandler = jest.fn()
        render(<Blog blog={blog}/>).container
        const user = userEvent.setup()

        let button = screen.getByText('view')
        await user.click(button)

        button = screen.getByText('like')
        await user.click(button)

        button = screen.getByText('like')
        await user.click(button)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})