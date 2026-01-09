"use client";
import ProductCard from './product-card'
import styles from './Store.module.css'
import data from './events.json'
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthUserContext";
import { useEffect, useState } from "react";
import { useProducts } from '@/hooks/useProducts';

export default function Store() {
  const { authUser, loading, signOutUser } = useAuth();
  const router = useRouter();
  useEffect(() => {
    async function check() {
      if (!authUser) {
        router.replace("/register")
      }
    }
    check()
  }, [authUser, router]);
  const { products } = useProducts();
  return <>
    <div className={`bg-muted flex flex-col min-h-svh gap-8 items-left justify-center p-2 md:p-10 ${styles.background} text-white`}>
      <h1 className="race font-bold text-5xl text-grad mt-[15vh]">Store</h1>
      <div className="flex items-center justify-center flex-wrap gap-2 md:gap-8">
        {products.map((product, idx) => <ProductCard key={idx} name={product.name} cost={product.cost} id={product.id} img_src={product.img_src} />)}
      </div>
    </div>
  </>
}
