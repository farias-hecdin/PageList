// PROMPT: Puedes crear un componente de react que interactue con el siguente codigo

class Bookmark {
  constructor(title, url) {
    this.title = title;
    this.url = url;
    this.view = 0;
  }
}

class Folder {
  constructor(name) {
    this.name = name;
    this.bookmarks = [];
  }

  findBookmark(bookmark) {
    return this.bookmarks.find((b) => b.title === bookmark);
  }
  addBookmark(bookmark) {
    this.bookmarks.push(bookmark);
  }

  removeBookmark(bookmark) {
    this.bookmarks = this.bookmarks.filter((b) => b.url !== bookmark.url);
  }
}

class Collection {
  constructor(name) {
    this.name = name;
    this.folders = [];
  }

  getFolderCount() {
    return this.folders.length;
  }

  addFolder(folder) {
    this.folders.push(folder);
  }

  findBookmarkToFolder(folderName, bookmark) {
    const folder = this.folders.find((folder) => folder.name === folderName);
    if (folder) {
      return folder.findBookmark(bookmark);
    } else {
      console.warn(`No se encontró una carpeta con el nombre ${folderName}`);
    }
  }

  removeFolder(folder) {
    this.folders = this.folders.filter((f) => f.name !== folder.name);
  }

  addBookmarkToFolder(folderName, bookmark) {
    const folder = this.folders.find((folder) => folder.name === folderName);
    if (folder) {
      folder.addBookmark(bookmark);
    } else {
      console.warn(`No se encontró una carpeta con el nombre ${folderName}`);
    }
  }

  removeBookmarkFromFolder(folderName, bookmark) {
    const folder = this.folders.find((folder) => folder.name === folderName);
    if (folder) {
      folder.removeBookmark(bookmark);
    } else {
      console.warn(`No se encontró una carpeta con el nombre ${folderName}`);
    }
  }
}

// Crear una colección
const collection = new Collection("Mis marcadores");

// Crear carpetas
const folder1 = new Folder("Programacion");
const folder2 = new Folder("Diseno");

// Crear marcadores
const bookmark1 = new Bookmark("MDN Web Docs", "https://developer.mozilla.org/en-US/");
const bookmark2 = new Bookmark("Canva", "https://www.canva.com/");
const bookmark3 = new Bookmark("JavaScript.info", "https://javascript.info/");

// Agregar marcadores a las carpetas
folder1.addBookmark(bookmark1);
folder2.addBookmark(bookmark2);
folder1.addBookmark(bookmark3);

// Agregar carpetas a la colección
collection.addFolder(folder1);
collection.addFolder(folder2);

// Remover un marcador de una carpeta específica
collection.removeBookmarkFromFolder("Programacion", bookmark3);

// Acceder a las carpetas y marcadores de la colección

console.log((collection.findBookmarkToFolder("Programacion", "MDN Web Docs").view += 1));

console.log((collection.findBookmarkToFolder("Programacion", "MDN Web Docs").view += 1));
// Remover una carpeta de la colección
/* collection.removeFolder(folder1); */

// Remover una colección
// No es necesario crear un método para esto, ya que se puede hacer simplemente asignando `null` o `undefined` a la variable que hace referencia a la colección
/* collection = null; */
