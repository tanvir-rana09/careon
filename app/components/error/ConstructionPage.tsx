import { Image } from "antd";
import { images } from "~/constants/themes";

const ConstructionPage = () => {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center p-4">
            <div className="text-center">
                <Image
                    src={images.construction}
                    alt="under maintenance image"
                    className="object-cover max-w-[600px]"
                    preview={false}
                />
                <h2 className="text-center text-gray-800 text-3xl font-bold font-manrope leading-normal">
                    Please bear with us! We&apos;re currently under maintenance.
                </h2>
                <p className="text-center text-gray-500 text-base font-normal leading-relaxed">
                    It&apos;s going to take some time to fix the error.
                    We&apos;ll be back online in.
                </p>
            </div>
        </div>
    );
};

export default ConstructionPage;
