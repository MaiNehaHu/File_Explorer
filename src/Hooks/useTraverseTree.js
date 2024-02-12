const useTraverseTree = () => {
  function insertNode(tree, folderId, itemName, isFolder) {
    //If Tree is folder. Then only the file or folder will be added.
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: itemName,
        isFolder,
        items: [],
      });

      return tree;
    }

    // Traversing through all the trees inside the tree
    tree.items = tree.items.map((obj) => {
      return insertNode(obj, folderId, itemName, isFolder);
    });

    return { ...tree };
  }

  function removeNode(tree, folderId) {
    tree.items = tree.items.filter((node) => {
      if (node.id === folderId) {
        // Exclude if it matches the folderId
        return false;
      }
      // Recursively remove the node from the subtree
      removeNode(node, folderId);
      return true;
    });

    return { ...tree };
  }

  function renameNode(tree, folderId, itemName) {
    if (tree.id === folderId) {
      tree.name = itemName;

      return tree;
    }

    // Traversing through all the trees inside the tree
    tree.items = tree.items.map((obj) => {
      return renameNode(obj, folderId, itemName);
    });

    return { ...tree };
  }

  return { insertNode, removeNode, renameNode };
};

export default useTraverseTree;
