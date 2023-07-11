import {useQueryClient, useQuery, useMutation} from "@tanstack/react-query";
import {useState} from "react";

// const POSTS = [
//   {id: 1, title: 'Post 1'},
//   {id: 2, title: 'Post 2'},

// ];
import { getPost } from "./api/posts"
import { CreatePost } from "./old-CreatePost"
import Post from "./old-Post"
import { PostListInfinite } from "./old-PostListInfinite"
import { PostListPaginated } from "./old-PostListPaginated"
import PostsList1 from "./old-PostsList1"
import PostsList2 from "./old-PostsList2"


// function App() {
//   const queryClient = useQueryClient();

//   const postQuery = useQuery({
//     queryKey: ["posts"],
//     queryFn: () => wait(1000).then(() => [...POSTS])
//     // queryFn: ()=> Promise.reject("Error occured")

//   });

//   const newPostMutation = useMutation({
//     mutationFn: (title) => wait(1000).then(() => POSTS.push({
//       id: crypto.randomUUID(),
//       title
//     })),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["posts"]);
//     }
//   });

//   if (postQuery.isLoading) return <h1>loading</h1>;
//   if (postQuery.isError) return <pre>{JSON.stringify(postQuery.error)}</pre>;

//   return <div>
//     {postQuery.data.map((post => {
//       return <div key={post.id}>{post.title}</div>;
//     }))}
//     <button disabled={newPostMutation.isLoading} onClick={() => newPostMutation.mutate('some new post')}> Add new</button>
//   </div>;
// }

// function wait(duration) {
//   return new Promise(res => setTimeout(res, duration));
// }
export default function App() {
  const [currentPage, setCurrentPage] = useState()
  const queryClient = useQueryClient()

  function onHoverPostOneLink() {
    queryClient.prefetchQuery({
      queryKey: ["posts", 1],
      queryFn: () => getPost(1),
    })
  }

  return (
    <div>
      <button onClick={() => setCurrentPage(<PostsList1 />)}>
        Posts List 1
      </button>
      <button onClick={() => setCurrentPage(<PostsList2 />)}>
        Posts List 2
      </button>
      <button
        onMouseEnter={onHoverPostOneLink}
        onClick={() => setCurrentPage(<Post id={1} />)}
      >
        First Post
      </button>
      <button
        onClick={() =>
          setCurrentPage(<CreatePost setCurrentPage={setCurrentPage} />)
        }
      >
        New Post
      </button>
      <button onClick={() => setCurrentPage(<PostListPaginated />)}>
        Post List Paginated
      </button>
      <button onClick={() => setCurrentPage(<PostListInfinite />)}>
        Post List Infinite
      </button>
      <br />
      {currentPage}
    </div>
  )
}

// export default App;