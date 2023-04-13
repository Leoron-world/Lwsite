import React from "react";
import { BsFacebook } from "react-icons/bs";
import { FaInstagramSquare } from "react-icons/fa";
import { AiFillYoutube } from "react-icons/ai";

const Footer = () => {
  return (
    <>
      <hr className="text-neutral-500" />
      <div className="flex flex-col bg-neutral-950 text-secondary w-full h-full p-8">
        <div className="grid grid-cols-3  place-items-center items-baseline bg-grey-400">
          <div className="flex flex-col  list-none gap-4  items-center ">
            <span className="cursor-pointer font-bold text-4xl text-secondary">
              L<span className="text-green-500">W</span>
            </span>
            <div className="flex flex-col items-center gap-4">
              <div className="flex gap-4">
                <li>
                  <BsFacebook
                    size={30}
                    className="cursor-pointer hover:text-green-500"
                  />
                </li>
                <li>
                  <FaInstagramSquare
                    size={30}
                    className="cursor-pointer hover:text-green-500"
                  />
                </li>
                <li>
                  <AiFillYoutube
                    size={30}
                    className="cursor-pointer hover:text-green-500"
                  />
                </li>
              </div>
              <div>© 2023, LW Games.</div>
              <div className="mb-4 text-justify">
                All rights to the franchise belong to the Indian company LW
                Games, we do not claim ownership of the product and do not plan
                to use the result of our work for commercial purposes.
              </div>
            </div>
          </div>
          <div className="flex flex-col list-none gap-2">
            <li className="hover:text-green-500 cursor-pointer">About</li>
            <li className="hover:text-green-500 cursor-pointer">Contact</li>
            <li className="hover:text-green-500 cursor-pointer">Services</li>
            <li className="hover:text-green-500 cursor-pointer">About</li>
            <li className="hover:text-green-500 cursor-pointer">Contact</li>
            <li className="hover:text-green-500 cursor-pointer">Services</li>
          </div>
          <div className="flex flex-col list-none gap-2">
            <li className="hover:text-green-500 cursor-pointer">Silver</li>
            <li className="hover:text-green-500 cursor-pointer">Gold</li>
            <li className="hover:text-green-500 cursor-pointer">Platinum</li>
            <li className="hover:text-green-500 cursor-pointer">Silver</li>
            <li className="hover:text-green-500 cursor-pointer">Gold</li>
            <li className="hover:text-green-500 cursor-pointer">Platinum</li>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 mt-4"></div>
      </div>
    </>
  );
};

export default Footer;
