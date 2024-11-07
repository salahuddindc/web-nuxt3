export const gridProfitFees = (maxPrice, minPrice, gridNo, currentMarketPrice) => { //calculate the grid profit percentage
    //((( max - min )/gridNo )/nowPrice) * 100
    // devide the difference of min and max with gridNo
    // then get the percentage of that value with nowPrice of grid (Last Price at trade dashboard)

    const nowPrice = currentMarketPrice.price
    const difference = maxPrice - minPrice
    const gridValue = difference / gridNo
    const percentage = (gridValue / nowPrice) * 100

    return percentage
}

export const gridProfitFeesRange = (percentage) => {
    const minValue = parseFloat(percentage * 0.75).toFixed(2) //suggested value
    const maxValue = parseFloat(percentage * 1.25).toFixed(2) //suggested value

    return {
        min: minValue,
        max: maxValue
    }
}


export const updateMarketPrice = (currentContext, currencySymbol) => {
    //whenever called must uninvoke this socket before leaving page or component
    const context = currentContext
    //console.log('_self.$socket', context.$socket);
    const symbleParameString = currencySymbol.toLowerCase()
    context.$socket.invoke({
        sub: 'market.' + symbleParameString + '.detail',
        type: context.$socket.type.quotation_daily_get
    })

    context.$socket.receive(context.$socket.type.quotation_daily_get, function (data) {

        context.$store.commit('market/setCurrentMarketPrice', data.data)
    })
}

export const isMobile = {

    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

export const isTradeView = (vueContext) => {
    return vueContext.$route.name == 'deal-id' ||
        vueContext.$route.name == 'margin-id' ||
        vueContext.$route.name == 'contract-id' ||
        vueContext.$route.name == 'deal-pro-id' ||
        vueContext.$route.name == 'margin-pro-id' ||
        vueContext.$route.name == 'contract-pro-id'
}

export const isGameView = (vueContext) => {
    return vueContext.$route.name == 'play-card'
}

export const containSeo = (str, key = 'name') => {
    const patternRegex = new RegExp('seo\\.[a-zA-Z0-9_-]+\\.' + key);
    return patternRegex.test(str);
}

export const getGharyalTime = (endTime, callback) => {
    const updateCountdown = () => {
        const currentTime = Date.now();
        const elapsedTime = endTime - currentTime;

        if (elapsedTime <= 0) {
            clearInterval(countdowninterval);
            callback({ days: 0, hours: 0, minutes: 0, seconds: 0 }); // Notify the callback with zeros when countdown is complete
            return;
        }

        const days = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((elapsedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
        callback({ days, hours, minutes, seconds });
    };

    const countdowninterval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial update

    return countdowninterval; // Return the interval ID for potential future use
};

export const unLink = (data) => {
    return JSON.parse(JSON.stringify(data))
}

export const symbolAdjustmentCoefficient = (symbolName, amount, vueContext) => {
    const adjustmentCoefficients = vueContext.$store.getters['constants/getAdjustmentCoefficients']
    const symbol = symbolName ? symbolName.toLowerCase() : ''
    let symbolCoefficients = adjustmentCoefficients.filter(coefficient => symbol.includes(coefficient.token)).sort((a, b) => a.openinterest - b.openinterest)
    let adjustment = 0
    for (let i = 0; i < symbolCoefficients.length; i++) {
        if (amount <= symbolCoefficients[i].openinterest &&
            amount > (i > 0 ? symbolCoefficients[i - 1].openinterest : 0.0)) {
            adjustment = symbolCoefficients[i].adjustment ? symbolCoefficients[i].adjustment * 0.01 : 0;
        }
    }
    return adjustment
}

export const debounce = (func, wait, immediate) => {
    let timeout;
    return function (...args) {
        const context = this;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

export const copyTradeTags = (tags, vueContext) => {
    // console.log('vueContext copyTradeTags', vueContext);
    const tagsData = Array.isArray(tags) ? tags : [tags]
    const availableTags = vueContext.$store.getters['copy-trade/getTags']
    const modifiedTags = tagsData.map((tag) => {
        const index = availableTags.findIndex((avaiTag) => tag == avaiTag)
        let color = null
        if (index == 0) {
            color = 'blue'
        } else {
            color = 'green'
        }
        return {
            name: tag,
            color: color
        }
    })
    return modifiedTags
}

export const onFileSelect = (e, vueContext) => {
    return new Promise((resolve, reject) => {
        const file = e.target.files[0];

        if (!file) {
            return resolve({ status: false });
        }

        if (!checkPic(file, 5000, vueContext)) {
            return resolve({ status: false });
        }

        const obj = {
            name: file.name,
            base64: null,
            type: file.type,
            status: false
        }

        if (typeof FileReader === 'function') {
            const reader = new FileReader();
            reader.onload = (event) => {
                obj.base64 = event.target.result;
                obj.status = true;
                resolve(obj);  // Return obj after file is read
            };
            reader.onerror = (error) => {
                vueContext.$store.commit('set_message', { type: 'error', text: vueContext.$t('returntxt.rtxt38') });
                reject(error);  // Reject the promise if reading fails
            };
            reader.readAsDataURL(file);
        } else {
            vueContext.$store.commit('set_message', { type: 'error', text: vueContext.$t('returntxt.rtxt38') });
            reject(new Error(vueContext.$t('returntxt.rtxt38')));
        }
    });
};



function checkPic(obj, fileSize, vueContext, picExts = 'jpg|jpeg|png|bmp|gif|webp|pdf|doc') {
    const photoExt = obj.type.substr(obj.type.lastIndexOf("/") + 1).toLowerCase(); //获得文件后缀名
    const pos = picExts.indexOf(photoExt);
    if (pos < 0) {
        vueContext.$store.commit('set_message', { type: 'error', text: vueContext.$t('texts.txt22') });
        return false;
    }
    fileSize = Math.round(fileSize / 1024 * 100) / 100; //单位为KB
    if (fileSize > 5 * 1024) {
        vueContext.$store.commit('set_message', { type: 'error', text: vueContext.$t('validation_messages.file_size', { size: '5 MB' }) });
        return false;
    }
    return true;
}

// Save the image (base64-encoded)
export const saveFileToServer = async (imgUrlBase64, vueContext, imageType = 0, width = '120', height = '120', extension = 'png', filename = new Date().getTime() + Number(Math.random() * 1000000000)) => {

    const obj = {
        status: false,
        message: null,
        imageUrl: null
    }
    const params = { imgbase64: imgUrlBase64.split(',')[1], filename: filename + '.' + extension }

    if (imageType != null) {
        params['imageType'] = imageType
    }
    if (width != null) {
        params['width'] = width
    }
    if (height != null) {
        params['height'] = height
    }

    const res = await vueContext.$store
        .dispatch('com_image_upload', params);

    if (res.code == 200) {
        obj.status = true
        obj.imageUrl = res.data.imgurl
        obj.message = 'File uploaded successfully.'
    }
    return obj
}

export const can = (user, permission = null) => {
    if (['SUPER_ADMIN', 'ADMIN'].includes(user.role)) {
        return true
    }
    return false
}


export const authIsAdmin = (user) => {
    return user.role == 'SUPER_ADMIN' || user.role == 'ADMIN'
}

export const authIsUser = (user) => {
    return user.role == 'USER' || user.role == null
}