export async function createFolder(folder: string): Promise<void> {
    const folderPath = process.argv[2];
    console.log("Folder Path: ", folderPath);
}

createFolder("d")