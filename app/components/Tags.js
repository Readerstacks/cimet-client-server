export function Tags({ tags }) {

    if (tags.length > 0) {
      return <>
        {tags.map(tag =>
          <div key={tag.id} className="tag">
            {tag.tags?.name}
          </div>
        )}
      </>
    }
    else {
      return <></>
    }
  }