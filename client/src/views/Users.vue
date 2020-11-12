<template>
  <div class = 'page'>
      <h2 class = 'title is-2'>Users Page</h2>

        <table class="table">
            <thead><tr>
                <th>id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Password</th>
                <th>DOB</th>
                <th>Type</th>
            </tr></thead>
            <tbody><tr v-for="(x, i) in list" 
                :key="i" 
                :post="x">
                  <th>{{id}}</th>
                <th>{{x.FirstName}}</th>
                <th>{{x.LastName}}</th>
                <th>{{x.Password}}</th>
                <th>{{x.DOB}}</th>
                <th>{{x.Type}}</th>              
            </tr></tbody>
        </table>
        
    </div>
</template>

<script>

import { posts } from "@/models/users";

export default {
    data(){
        return{
            posts
        }
    },
    components: {
       
    }
}
</script>

<style>
    
</style>