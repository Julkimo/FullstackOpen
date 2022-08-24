import { useState } from 'react'
import PropTypes from 'prop-types'

const NewBlogForm = ({
  addBlog,
  newBlogTitle,
  newBlogUrl,
  newBlogAuthor,
  handleTitleChange,
  handleUrlChange,
  handleAuthorChange
}) => {

  NewBlogForm.propTypes = {
    newBlogTitle: PropTypes.string.isRequired,
    newBlogUrl: PropTypes.string.isRequired,
    newBlogAuthor: PropTypes.string.isRequired,
  }

  const [loginVisible, setLoginVisible] = useState(false)

  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible ? '' : 'none' }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setLoginVisible(true)}>new blog</button>
      </div>
      <div style={showWhenVisible}>
        <form onSubmit={addBlog}>
          <div>
            <>title: </>
            <input
              id='title'
              value={newBlogTitle}
              onChange={handleTitleChange}
            />
          </div>
          <div>
            <>author: </>
            <input
              id='author'
              value={newBlogAuthor}
              onChange={handleAuthorChange}
            />
          </div>
          <div>
            <>url:  </>
            <input
              id='url'
              value={newBlogUrl}
              onChange={handleUrlChange}
            />
          </div><button id='create-button' type="submit">create</button>
        </form>

        <button onClick={() => setLoginVisible(false)}>cancel</button>
      </div>
      <div>
        -------------------------------------------------------------
      </div>
    </div>
  )
}

export default NewBlogForm