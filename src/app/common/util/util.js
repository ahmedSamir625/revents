export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


export const getFileExtention=(filename)=>(
    filename.slice((filename.lastIndexOf('.')-1>>>0)+2)
)

