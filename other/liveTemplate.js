const fetchDemo = async (params) => {
    return new Promise((resolve, reject) => {
        fetch('https://www.fastmock.site/mock/46392a6c532d6eabda2d6899d4bd9800/api/api/userInfo').then(res => {
            resolve(res.json())
        }).catch(err => {
            reject(err);
        });
    })
}
