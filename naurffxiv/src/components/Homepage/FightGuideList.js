import { ultimateImages } from '@/app/constants.js';
import Image from 'next/image';

export default function FightGuideList() {
    return (
        <div>
            <h3 className="text-xl text-center">Ultimate Resources</h3>
            <div className="mt-3 grid gap-x-10 gap-y-4 grid-cols-[1fr] sm:grid-cols-[repeat(auto-fit,_minmax(350px,1fr))] justify-center mx-auto">
                {ultimateImages.map((slide) => {
                    return (
                        <div key={slide.id} className="bg-[#10242b] overflow-hidden rounded-lg group">
                            <a href={slide.url}>
                                <div className="relative h-48 group-hover:brightness-75">
                                    <Image src={slide.src} fill alt={slide.alt} className="object-cover object-left"/>
                                </div>
                                <p className="text-lg font-medium py-2 px-3 group-hover:underline">{slide.title}</p>
                            </a>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}