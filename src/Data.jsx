import React from 'react'

const Data = ({data}) => {
    
  return (
    <div>
      {
        data.lenght!==0 && 
        data.map((item,index)=>{
            return (
                <div key={index} className="todo-display">
                  <h4>{item.userName}</h4>
                  <h4>{item.bookName}</h4>
                  <h4>{item.authorName}</h4>
                  <h4>{item.price}</h4>
                  <button onClick={() => handleDelete(index)}>Dlt</button>
                  <button onClick={() => handleEdit(item, index)}>Edit</button>
                </div>
              );
        })
      }
    </div>
  )
}

export default Data
