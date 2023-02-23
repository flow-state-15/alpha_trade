import express from "express";
import WebSocket from "ws";
import axios from "axios";

// Utility
function jsonToQueryString(json) {
	return Object.keys(json)
		.map(function (key) {
			return (
				encodeURIComponent(key) + "=" + encodeURIComponent(json[key])
			);
		})
		.join("&");
}

const rawAuth = await axios(
	"https://developer.tdameritrade.com/user-principal/apis/get/userprincipals?fields=streamerSubscriptionKeys%2CstreamerConnectionInfo",
	{
		headers: {
			authorization: process.env.API_KEY,
		},
	}
);

const userPrincipalsResponse = rawAuth.data;

//Converts ISO-8601 response in snapshot to ms since epoch accepted by Streamer
const tokenTimeStampAsDateObj = new Date(
	userPrincipalsResponse.streamerInfo.tokenTimestamp
);
const tokenTimeStampAsMs = tokenTimeStampAsDateObj.getTime();

const credentials = {
	userid: userPrincipalsResponse.accounts[0].accountId,
	token: userPrincipalsResponse.streamerInfo.token,
	company: userPrincipalsResponse.accounts[0].company,
	segment: userPrincipalsResponse.accounts[0].segment,
	cddomain: userPrincipalsResponse.accounts[0].accountCdDomainId,
	usergroup: userPrincipalsResponse.streamerInfo.userGroup,
	accesslevel: userPrincipalsResponse.streamerInfo.accessLevel,
	authorized: "Y",
	timestamp: tokenTimeStampAsMs,
	appid: userPrincipalsResponse.streamerInfo.appId,
	acl: userPrincipalsResponse.streamerInfo.acl,
};

const request = {
	requests: [
		{
			service: "ADMIN",
			command: "LOGIN",
			requestid: 0,
			account: userPrincipalsResponse.accounts[0].accountId,
			source: userPrincipalsResponse.streamerInfo.appId,
			parameters: {
				credential: jsonToQueryString(credentials),
				token: userPrincipalsResponse.streamerInfo.token,
				version: "1.0",
			},
		},
	],
};

export const tdSocket1 = new WebSocket("wss://" + userPrincipalsResponse.streamerInfo.streamerSocketUrl + "/ws");

tdSocket1.on("connection", (ws, req) => {
	console.log("New WebSocket connection: tdSocket1");
	ws.send(request);
});

tdSocket1.on("message", (message) => {
	console.log(`Received message: ${message}`);
});

tdSocket1.on("error", (err) => {
    console.log(`ERROR: tdSocket1 - ${err}`)
})

tdSocket1.onclose = function () {
	console.log("tdSocket1 CLOSED");
};
