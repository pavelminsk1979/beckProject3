import {CreateAndUpdateBlogModel} from "../models/CreateAndUpdateBlogModel";
import {Blog} from "../db/db";
import {blogsCollection} from "../db/mongoDb";


export const blogsRepository = {
    async getBlogs() {
        return await blogsCollection.find({}).toArray()
    },


    async findBlogById(id: string) {
        return await blogsCollection.findOne({id:id})
    },


    async createBlog(requestBodyBlog: CreateAndUpdateBlogModel) {
        const {name, description, websiteUrl} = requestBodyBlog

        const newBlog: Blog = {
            id: (new Date()).toISOString(),
            name,
            description,
            websiteUrl
        }

        await blogsCollection.insertOne(newBlog)
        return newBlog
    },


    async updateBlog(id: string, requestBodyBlog: CreateAndUpdateBlogModel) {

        const {name, description, websiteUrl} = requestBodyBlog

        const result = await blogsCollection.updateOne({id: id}, {
            $set: {
                name: name,
                description: description,
                websiteUrl: websiteUrl
            }
        })

        return result.matchedCount === 1

    },



    async deleteBlogById(id: string) {

        const result = await blogsCollection.deleteOne({id: id})

        return result.deletedCount === 1
    }


}

