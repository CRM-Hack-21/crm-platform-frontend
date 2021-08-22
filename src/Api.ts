import React from "react";
import { useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'



const prod = "https://hackathon-mvp.discountracker.com/";
const dev = "http://192.168.43.81:8085/";

const api_endpoint = prod;

export async function login(vars: { mail: string, password: string, }) {
    let response = await fetch(
        api_endpoint + "login",
        {
            method: "POST",
            body: JSON.stringify(vars),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    let result = await response.json();

    if ('error' in result) {
        throw Error(result['error'])
    }

    let uuid = result.uuid;

    localStorage.setItem('session', uuid);

    return true;
}

export async function register(vars: { mail: string, password: string, }) {
    let response = await fetch(
        api_endpoint + "register",
        {
            method: "POST",
            body: JSON.stringify(vars),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    let result = await response.json();
    let uuid = result.uuid;

    localStorage.setItem('session', uuid);

    return true;
}

export async function add_vk(vars: { vk_token: string, }) {
    let response = await sessioned_post(api_endpoint + "vk_token", vars);

    let result = await response.json();
    return result;
}

async function sessioned_post(url: string, vars: any) {

    let uuid = localStorage.getItem('session');

    if (uuid === null) {
        throw Error("User not signed in!");
    }

    return await fetch(url,
        {
            method: "POST",
            body: JSON.stringify(vars),
            headers: {
                'Content-Type': 'application/json',
                'Session': uuid
            }
        }
    );
    
}

export async function get_good({ id }: { id: string  }) {
    let response = await fetch(api_endpoint + "get_good?good=" + id,  {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await response.json();
}

export async function add_product(vars: any) {
    let response = await sessioned_post(api_endpoint + "product", vars);
    let result = await response.json();
    return result;
}