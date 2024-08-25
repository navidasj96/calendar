"use client"
import React from "react";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import {RecoilRoot} from "recoil";

export function Providers ({children}:{children:React.ReactNode }){


    return (
        <ReactQueryProvider>
            <RecoilRoot>
            <AntdRegistry>
                {children}
            </AntdRegistry>
            </RecoilRoot>
        </ReactQueryProvider>

        )

}