
import {DiscussionEmbed} from "disqus-react"


export const DisqusComponent = ({post} : any) => {
    const disqusShortname = "bodasdehoy-com"
    const disqusConfig = {
      url: `http://localhost:3000/${post?.rutaURL}`,
      identifier: post?._id, // Single post id
      title: post?.titulo // Single post title
    }
    return (
        <div className="w-full h-max pb-4">
            <DiscussionEmbed
             shortname={disqusShortname}
             config={disqusConfig}
        />
        </div>
    )
}


