import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Signup from "../views/auth/Signup.vue";
import Login from "../views/auth/Login.vue";
import AddProduct from "../views/AddProduct.vue";
import ProductDescription from "../views/ProductDescription.vue";
import MyProducts from "../views/MyProducts.vue";

import { projectAuth } from "@/firebase/config";
const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser;
  if (!user) {
    next({ name: "Login" });
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/register",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/add-product",
    name: "AddProduct",
    component: AddProduct,
    beforeEnter: requireAuth,
  },
  {
    path: "/product-description/:id",
    name: "ProductDescription",
    component: ProductDescription,
    props: true,
  },
  {
    path: "/myProducts",
    name: "MyProducts",
    component: MyProducts,
    beforeEnter: requireAuth,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
