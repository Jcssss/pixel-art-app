const PixelHelpers = {
    getUp (width: number, height: number, index: number): number {
        if (index >= width) {
            return index - width;
        }
        return -1;
    },
    getDown (width: number, height: number, index: number): number {
        if (index < height * width - width) {
            return index + width;
        }
        return -1;
    },
    getRight (width: number, height: number, index: number): number {
        if (index + 1 % width !== 0) {
            return index + 1;
        }
        return -1;
    },
    getLeft (width: number, height: number, index: number): number {
        if (index % width !== 0) {
            return index - 1;
        }
        return -1;
    }
}

export default PixelHelpers