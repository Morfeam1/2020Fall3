<template>
  <div class = 'page'>
      <h2 class = 'title is-2'>Feed Page</h2>

        <div class="columns">
            <div class = "column is-two-thirds">
                <Post v-for="(x, i) in posts" 
                :key="i" 
                :post="x" />  
            </div>
            <div class = "column is-one-third">
                <SideBar />
            </div>
        </div>
    </div>
</template>

<script>
import Post from "@/components/Post";
import SideBar from "@/components/SideBar";
import { posts } from "@/models/feed";

export default {
    data(){
        return{
            posts
        }
    },
    components: {
        Post, SideBar
    }
}
</script>

<style>
    .card{
        margin-top: 15px; 
    }
</style>