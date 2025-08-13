import { FC } from "react";
import "./Loader.css";

export interface ILoaderProps {
  color?: 'green' | 'white';
}

export const Loader: FC<ILoaderProps> = ({ color = 'green' }) => (
  <div className="loader" data-color={color}>
    <div className="loader-item"></div>
    <div className="loader-item"></div>
    <div className="loader-item"></div>
  </div>
);
