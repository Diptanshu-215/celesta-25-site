import Image from "next/image";
import Link from "next/link";

export default function EventCard({ name, img_src, register_link }) {
  return (
    <>
      <div className="mx-auto border-2 border-white rounded-4xl bg-gradient-to-br from-gray-800 blue-950 via-black to-green-800 w-80">
        <div className="border-2 border-white mx-3 mt-3 rounded-t-4xl flex justify-center border-b-0">
          <h1 className="text-white font-extrabold uppercase">{name}</h1>
        </div>
        <div className="border-2 border-white mx-3 mt-0 overflow-hidden">
          <Image
            src={img_src}
            alt="img"
            className="transform transition-transform hover:scale-110 focus:scale-110"
            width={500}
            height={200}
          />
        </div>
        <div className="flex justify-end">
          <div className="border-2 border-white m-3 rounded-br-4xl rounded-tl-4xl hover:bg-gradient-to-br from-green-800 to-black w-44 flex justify-center transition-colors">
            <Link href={register_link} className="text-white hover:cursor-pointer uppercase">
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
