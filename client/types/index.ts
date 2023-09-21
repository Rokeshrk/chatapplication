import { MouseEventHandler } from "react";

export interface LoginProps{
    username: string;
    email: string;
    password: string;
}

export interface HomeProps {
    searchParams: FilterProps;
  }

export interface FilterProps{
    email: string;
}