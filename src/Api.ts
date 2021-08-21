import React from "react";
import { useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const api_endpoint = "http://192.168.43.81:8085/";

export async function login(vars: { email: string, password: string, }) {
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
    let uuid = result.uuid;

    localStorage.setItem('session', uuid);

    return true;
}

export async function register(vars: { email: string, password: string, }) {
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

export async function add_vk(vars: { email: string, password: string, }) {
    let response = await fetch(
        api_endpoint + "add_vk",
        {
            method: "POST",
            body: JSON.stringify(vars),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

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