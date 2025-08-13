'use client';

import { FC, useCallback, useEffect, useState } from "react";
import { Photos } from "../../models";
import Api from "../../api/api";
import "./index.css";
import Image from 'next/image';

type Props = {
    albumId: number;
};

const Album: FC<Props> = ({ albumId }: Props) => {
    const [data, setData] = useState<Photos>([]);

    const getData = useCallback(async (): Promise<void> => {
        const data = await Api.getPhotos(albumId);
        setData(data);
    }, [albumId]);

    useEffect(() => {
        getData();
    }, [getData]);

    return (
        <div className="album-container">
            {data.map((photo) => (
                <div className="photo-container" key={photo.id}>
                  <Image
                    src={photo.url}
                    alt={photo.title}
                    width={150}
                    height={150}
                    className="photo-img"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
            ))}
        </div>
    );
};

export default Album;