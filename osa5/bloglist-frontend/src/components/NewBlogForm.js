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
        <button onClick={() => setLoginVisible(true)}>create blog</button>
      </div>
      <div style={showWhenVisible}>
        <form onSubmit={addBlog}>
          <div>
            <>title: </>
            <input
              value={newBlogTitle}
              onChange={handleTitleChange}
            />
          </div>
          <div>
            <>author: </>
            <input
              value={newBlogAuthor}
              onChange={handleAuthorChange}
            />
          </div>
          <div>
            <>url:  </>
            <input
              value={newBlogUrl}
              onChange={handleUrlChange}
            />
          </div><button type="submit">create</button>
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