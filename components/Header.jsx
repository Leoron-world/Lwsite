import React, { useState } from "react";
import Link from "next/link";
import supabase from "../lib/index";
import { useSession } from "@supabase/auth-helpers-react";

async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  if (error) {
    console.error(error);
  }
}

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const session = useSession();

  return (
    <div className="container mx-auto px-4 md:px-10 mb-8">
      <div className=" w-full  border-green-500 py-8 flex flex-col md:flex-row justify-between items-center  ">
        <div className="flex items-center ">
          <Link href="/">
            <span className="cursor-pointer font-bold text-4xl text-neutral-400">
              L<span className="text-green-500">W</span>
            </span>
          </Link>
          <button
            className="md:hidden ml-auto p-2 rounded text-neutral-400 focus:outline-none"
            onClick={() => setShowMenu(!showMenu)}
          >
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="menu w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M2 5a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zm0 5a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zm1 5a1 1 0 100 2h14a1 1 0 100-2H3z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div
          className={` w-full  flex md:flex-grow ${
            showMenu ? " block" : "hidden"
          } md:flex md:items-center md:w-auto`}
        >
          <div className="w-full flex justify-end justify-items-center gap-8  md:flex-grow ">
            {/* <Link href="/fan-stories">
              <span className="block mt-4 md:inline-block md:mt-0 text-neutral-400 font-semibold hover:text-green-500 mr-4">
                Fan stories
              </span>
            </Link> */}
            <div>
              <Link href="/magazine">
                <span className="block mt-4 md:inline-block md:mt-0 text-neutral-400 font-semibold hover:text-green-500 ">
                  Magazine
                </span>
              </Link>
            </div>
            <div>
              <Link href="/indian-football">
                <span className="block mt-4 md:inline-block md:mt-0 text-neutral-400 font-semibold hover:text-green-500">
                  Indian Football
                </span>
              </Link>
            </div>
            <div>
              {!session && (
                <button
                  className="block mt-4 md:inline-block md:mt-0 text-neutral-400 font-semibold hover:text-green-500  focus:outline-none "
                  onClick={signInWithGoogle}
                >
                  Login
                </button>
              )}
            </div>
            <div>
              {session && (
                <Link href="/profile">
                  <button className="block mt-4 md:inline-block md:mt-0 text-neutral-400 font-semibold hover:text-green-500 focus:outline-none ">
                    Profile
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
