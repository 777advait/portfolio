const REQUEST_LIMIT = 3; // Max requests
const TIME_WINDOW = 60 * 1000; // 60 seconds (1 minute)
let requestCounter: {
  [key: string]: { count: number; firstRequestTime: number };
} = {};

const resetRequestCount = (clientAddress: string, currentTime: number) => {
  const clientData = requestCounter[clientAddress];

  if (clientData && currentTime - clientData.firstRequestTime > TIME_WINDOW) {
    requestCounter[clientAddress] = { count: 0, firstRequestTime: currentTime };
  }
};

export function rateLimit(clientAddress: string) {
  const currentTime = Date.now();

  if (!requestCounter[clientAddress]) {
    requestCounter[clientAddress] = { count: 0, firstRequestTime: currentTime };
  }

  resetRequestCount(clientAddress, currentTime);

  const clientData = requestCounter[clientAddress];

  if (clientData.count >= REQUEST_LIMIT) {
    return {
      isAllowed: false,
      message: `Rate limit exceeded for IP ${clientAddress}`,
      clientAddress,
      remainingRequests: 0,
    };
  } else {
    requestCounter[clientAddress].count++;
    
    return {
      isAllowed: true,
      clientAddress,
      message: `Request count for clientAddress, ${clientAddress} = ${requestCounter[clientAddress].count}`,
      remainingRequests: REQUEST_LIMIT - requestCounter[clientAddress].count,
    };
  }
}
