export const topicDocs = {
  "Arrays": {
    title: "Fundamentals of Arrays",
    content: "An array is a collection of items stored at contiguous memory locations. The idea is to store multiple items of the same type together. \n\n**Key Techniques to Master:**\n1. **Two Pointers:** Using two indices to traverse the array from both ends or at different speeds (e.g., reversing an array, finding a sum).\n2. **Prefix Sum:** Precomputing the sum of elements from the start to each index to answer range-sum queries in O(1) time.\n3. **Kadane's Algorithm:** An elegant O(N) dynamic programming approach to find the maximum contiguous subarray sum.\n4. **Sliding Window:** Maintaining a subset of elements (a 'window') that satisfies specific conditions while iterating through the array.\n\n**Common Pitfalls:** Watch out for out-of-bounds errors (IndexOutOfBounds) and edge cases like empty arrays or arrays with a single element."
  },
  "Binary Search [1D, 2D Arrays, Search Space]": {
    title: "Mastering Binary Search",
    content: "Binary Search is a classic O(log N) algorithm used to find the position of a target value within a sorted array.\n\n**The Golden Rule:** You can apply binary search to ANY problem where the search space is monotonic (i.e., you can define a condition that is `false` for one half and `true` for the other).\n\n**Key Variations:**\n1. **Standard Search:** Finding a specific element in a sorted array.\n2. **Search on Answers:** This is the most common interview variant! You are asked to find the minimum/maximum possible value (e.g., Book Allocation, Koko Eating Bananas). You binary search over the *range of possible answers*, checking if each answer is valid.\n3. **2D Matrix Search:** Treating a sorted matrix as a flattened 1D array to achieve O(log(M*N)) search time."
  },
  "Linked List": {
    title: "Linked List Mastery",
    content: "A Linked List is a linear data structure where elements are not stored in contiguous memory locations. Elements are linked using pointers.\n\n**Key Techniques to Master:**\n1. **Fast and Slow Pointers (Tortoise and Hare):** Extremely useful for cycle detection (Floyd's algorithm) or finding the middle of a linked list in a single pass.\n2. **Dummy Nodes:** Creating a temporary 'dummy' head node can vastly simplify edge cases, especially when the head of the list might change or be deleted.\n3. **Reversing a List:** Master the iterative approach (prev, current, next pointers) as it forms the basis of many hard problems (e.g., Reverse in K-Groups)."
  },
  "Dynamic Programming": {
    title: "Demystifying Dynamic Programming",
    content: "Dynamic Programming (DP) is an algorithmic technique for solving an optimization problem by breaking it down into simpler subproblems and utilizing the fact that the optimal solution to the overall problem depends upon the optimal solution to its subproblems.\n\n**The Two Approaches:**\n1. **Top-Down (Memoization):** Start solving the given problem by breaking it down. If you see that the problem has been solved already, then just return the saved answer. (Recursive)\n2. **Bottom-Up (Tabulation):** Analyze the problem and see the order in which the sub-problems are solved and start solving from the trivial subproblem, up towards the given problem. (Iterative)\n\n**How to identify DP:** Does the problem ask for the maximum, minimum, longest, or shortest something? Can you make decisions step-by-step that affect future decisions? It's likely DP!"
  },
  "Graphs": {
    title: "Navigating Graphs",
    content: "A Graph is a non-linear data structure consisting of nodes (vertices) and edges.\n\n**Core Traversals:**\n1. **Breadth-First Search (BFS):** Explores all neighbor nodes at the present depth prior to moving on to the nodes at the next depth level. Uses a Queue. Excellent for finding the shortest path in unweighted graphs.\n2. **Depth-First Search (DFS):** Explores as far as possible along each branch before backtracking. Uses a Stack (or recursion). Excellent for exploring all paths or topological sorting.\n\n**Advanced Algorithms:**\n- **Dijkstra's:** Shortest path in weighted graphs (no negative cycles).\n- **Kruskal's / Prim's:** Minimum Spanning Tree.\n- **Disjoint Set (Union-Find):** Incredibly powerful for finding connected components or cycle detection in undirected graphs."
  }
};
