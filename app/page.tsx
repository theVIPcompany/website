'use client'

import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link"
import { useEffect } from 'react';

import { Newsletter } from "@/components/forms";

export default function Home() {

  useEffect( () => {
    (
      async () => {
          const LocomotiveScroll = (await import('locomotive-scroll')).default
          const locomotiveScroll = new LocomotiveScroll();
      }
    )()

  }, [])

  return (
    <main className={styles.main} >
      <div className="mb-3">
        <Image
          className={styles.logo}
          src="/logo.png"
          alt="The Visual Identify Partners Logo"
          width={210}
          height={60}
          priority
        />
      </div>
      <div className="d-flex flex-column align-items-center">
        <span className="fw-bolder text-center fs-6 mb-5 px-3">We are working on something magnificient and we will like you to be the first to experience it. Submit your e-mail so we can reserve you a seat in the front row.</span>
        <Newsletter/>
        <div className="d-flex flex-row mt-3 gap-2 justify-content-center">
          <em className="align-middle">Follow us:</em>
          <Link href="/#" className="text-reset"><i className="fa-brands fa-facebook fs-4"></i></Link>
          <Link href="/#" className="text-reset"><i className="fa-brands fa-twitter fs-4"></i></Link>
          <Link href="/#" className="text-reset"><i className="fa-brands fa-linkedin fs-4"></i></Link>
        </div>
      </div>
      <div className="d-flex flex-row justify-content-center gap-1">Powered by <Image src="/vercel.svg" width={60} height={20} alt="Vercel Logo"/></div>
    </main>
  );
}
