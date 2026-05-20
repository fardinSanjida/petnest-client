import Image from "next/image";
import Link from "next/link";
import WhiteLogo from "../asset/pet_nest_white.png";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-950 text-slate-100">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <Image src={WhiteLogo} alt="PetNest Logo" className="h-16 w-40 object-contain sm:w-48" />
          <p className="mt-3 text-sm text-slate-300">
            A friendly place for shelters and families to connect pets with caring homes.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Contact</h3>
          <p className="mt-3 text-sm text-slate-300">Dhaka, Bangladesh</p>
          <p className="text-sm text-slate-300">hello@petnest.local</p>
          <p className="text-sm text-slate-300">+880 1700 000 000</p>
        </div>
        <div>
          <h3 className="font-semibold">Social</h3>
          <div className="mt-3 flex gap-4 text-sm text-slate-300">
            <Link href="#">Facebook</Link>
            <Link href="#">Instagram</Link>
            <Link href="#">LinkedIn</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800 py-4 text-center text-sm text-slate-400">
        Copyright 2026 PetNest. All rights reserved.
      </div>
    </footer>
  );
}
