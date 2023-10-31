import {  useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'

function AddComment ({asin}) {
  // state = {
  //   comment: {
  //     comment: '',
  //     rate: 1,
  //     elementId: this.props.asin,
  //   },
  // }
  const [comment,setComment]= useState({
    comment: '',
   rate: 1,
     elementId: asin,
  })

  // componentDidUpdate(prevProps) {
  //   if (prevProps.asin !== this.props.asin) {
  //     this.setState({
  //       comment: {
  //         ...this.state.comment,
  //         elementId: this.props.asin,
  //       },
  //     })
  //   }
  // }
  
  // sendComment = async (e) => {
    //   e.preventDefault()
    //   try {
      //     let response = await fetch(
        //       'https://striveschool-api.herokuapp.com/api/comments',
  //       {
  //         method: 'POST',
  //         body: JSON.stringify(this.state.comment),
  //         headers: {
  //           'Content-type': 'application/json',
  //           Authorization: 'Bearer inserisci-qui-il-tuo-token',
  //         },
  //       }
  //     )
  //     if (response.ok) {
  //       alert('Recensione inviata!')
  //       this.setState({
  //         comment: {
  //           comment: '',
  //           rate: 1,
  //           elementId: this.props.asin,
  //         },
  //       })
  //     } else {
    //       throw new Error('Qualcosa è andato storto')
  //     }
  //   } catch (error) {
  //     alert(error)
  //   }
  // }
  useEffect(()=>{
    setComment((prevProps)=> ({
      ...prevProps,
      elementId:asin,
    }));
  },[asin])

  const sendComment = async(e)=>{
    e.preventDefault()
    try{
      let res = await fetch(
        'https://striveschool-api.herokuapp.com/api/comments',
        {
          method: 'POST',
          body: JSON.stringify(comment),
          headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTQxMGE1YmIxODE2MzAwMTRjOGZmOGIiLCJpYXQiOjE2OTg3NjEzMDcsImV4cCI6MTY5OTk3MDkwN30.t803auCjJvYj4sJK1EAAL2flhjD5yEcoQPeP25HIv7A"
            },
        }
        );
        if(res.ok){
          
        alert('Recensione inviata!');
        setComment({
          comment: '',
          rate: 1,
          elementId: asin,
        });
     
        } else {
          throw new Error('Qualcosa è andato storto');
        }
      } catch(err){
        alert(err)
      }
  }

    return (
      <div className="my-3">
        <Form onSubmit={sendComment}>
          <Form.Group className="mb-2">
            <Form.Label>Recensione</Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci qui il testo"
              value={comment.comment}
              onChange={(e) =>
                setComment({
                  comment: {
                    ...comment,
                    comment: e.target.value,
                  },
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Valutazione</Form.Label>
            <Form.Control
              as="select"
              value={comment.rate}
              onChange={(e) =>
                setComment({
                  comment: {
                    ...comment,
                    rate: e.target.value,
                  },
                })
              }
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Invia
          </Button>
        </Form>
      </div>
    )
  }

export default AddComment
