### 1. Project Structure

```
.
├── 
├── public
└── src
    ├── app
    ├── components
    ├── Providers    
    ├── state               
    └── types           
```

---
#### 1- app 
This folder Contains all pages in the project 

##### 1-1 api

Using Route Handler to generate some static task and then Load it in the project using `react query`.

#### 1-2 tasks

This is a dynamic route and the address in the url is `/tasks/year/month` for showing Total tasks in a Month.

#### 1-3 layout.tsx , page.tsx , global.css

These are standard files used in `App router ` in Nextjs

### 2- components

In this folder we have `pages` contains components for every page in the project.  

### 3- providers

Stack all providers such as `react query ` , `ant design` and `recoil`  and then use it in the main `layout.tsx` in the `app` directory.

### 4- states

Store states related to the project such as `tasks`.

### 5- types

Different Types for `typescript` are stored here.



