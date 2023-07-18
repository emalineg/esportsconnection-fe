import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type NextPage } from "next";
import Head from "next/head";
import { type FC } from "react";
import Footer from "~/components/Footer";
import Nav from "~/components/Nav";
import { NextSeo } from "next-seo";

type TeamCardProps = {
    name: string;
    picture: string;
    title: string;
    description: string;
    twitter?: string;
};

const TeamCard: FC<TeamCardProps> = ({ name, picture, title, description, twitter }) => {
    return (
        <div className="items-center bg-indigo-100 text-indigo-900 rounded-lg sm:flex">
            <span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg" src={picture} alt={`${name} Picture`} />
            </span>
            <div className="p-5">
                <h3 className="text-xl font-bold tracking-tight">{name}</h3>
                <span className="text-indigo-600">{title}</span>
                <p className="mt-3 mb-4 font-light text-indigo-600">{description}</p>
                <ul className="flex space-x-4 sm:mt-0">
                    {twitter && 
                        <li>
                            <a href={twitter} className="text-indigo-600 hover:text-indigo-800">
                                <FontAwesomeIcon icon={faTwitter} className="w-5 h-5" />
                            </a>
                        </li>
                    }
                </ul>
            </div>
        </div>
    );
};

const TeamPage: NextPage = () => {
    return(
        <>
            <Head>
                <NextSeo title="Meet the Team" />
            </Head>
            <main className="flex min-h-screen flex-col items-center bg-indigo-200 w-full">
                <Nav />

                <div className="container max-w-screen-xl flex-grow text-indigo-900 flex flex-col items-center justify-center py-8">
                    <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold">Our Team</h2>
                        <p className="font-light text-indigo-600 lg:mb-16 sm:text-xl">Tagline</p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-2 px-4">
                        <TeamCard
                            name="Bonnie Green"
                            picture="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                            title="CEO & Web Developer"
                            description="Bonnie drives the technical strategy of the flowbite platform and brand."
                        />
                        <TeamCard
                            name="Jese Leos"
                            picture="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                            title="CTO"
                            description="Jese drives the technical strategy of the flowbite platform and brand."
                        />
                    </div>
                </div>

                <Footer/>
            </main>
        </>
    )
};

export default TeamPage;
