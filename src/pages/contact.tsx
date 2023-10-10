import { type NextPage } from "next";
import Head from "next/head";
import Footer from "~/components/Footer";
import Nav from "~/components/Nav";
import { NextSeo } from "next-seo";

const Contact: NextPage = () => {
    return(
        <>
            <Head>
                <NextSeo
                    title="Contact Us"
                />
            </Head>
            <main className="flex min-h-screen flex-col items-center bg-indigo-200 w-full">
                <Nav />

                <div className="container flex-grow text-indigo-900 flex flex-col items-center justify-center">
                    <h1 className="text-5xl font-light">Contact Us </h1>
                    <p className="text-lg leading-loose">Email us at <a href="mailto:test@email.com" target="_blank" className="underline">test@email.com</a>.</p>
                </div>
                <Footer/>
            </main>
        </>
    )
}   
export default Contact;
