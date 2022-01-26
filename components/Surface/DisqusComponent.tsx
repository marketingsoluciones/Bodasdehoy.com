
import {DiscussionEmbed} from "disqus-react"
import { FC } from 'react';
import { Post } from "../../interfaces";


export const DisqusComponent : FC <Partial<Post>> = ({slug, _id, title}) => {
    const disqusShortname = "bodasdehoy-com"
    const disqusConfig = {
      url: `http://localhost:3000/${slug}`,
      identifier: _id, // Single post id
      title: title // Single post title
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


