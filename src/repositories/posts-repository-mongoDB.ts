import {CreateAndUpdatePostModel} from "../models/CreateAndUpdatePostModel";
import {Post} from "../db/db";
import {postsCollection} from "../db/mongoDb";




export const postsRepository = {

    async getPosts(): Promise<Post[]> {
        return await postsCollection.find({}).toArray()
    },


    async findPostById(id: string) {
        return await postsCollection.findOne({id: id})
    },


    async createPost(requestBodyPost: CreateAndUpdatePostModel) {
        const {title, shortDescription, content, blogId} = requestBodyPost

        const newPost: Post = {
            id: (new Date()).toISOString(),
            title,
            shortDescription,
            content,
            blogId,
            blogName: 'anyBlogName'
        }

        await postsCollection.insertOne(newPost)

        return newPost
    },


    async updatePost(id: string, requestBodyPost: CreateAndUpdatePostModel) {

        const {title, blogId, content, shortDescription} = requestBodyPost

        const result = await postsCollection.updateOne({id: id}, {
            $set: {
                title: title,
                blogId: blogId,
                content: content,
                shortDescription: shortDescription
            }
        })

        return result.matchedCount === 1
    },


    async deletePostById(id: string) {

        const result = await postsCollection.deleteOne({id: id})

        return result.deletedCount === 1
    }

}