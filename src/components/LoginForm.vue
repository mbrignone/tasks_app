<template>
  <!-- Modal content -->
  <div class="relative bg-white rounded-lg shadow">
    <div class="px-6 py-6 lg:px-8">
      <h3 class="mb-4 text-xl font-medium text-gray-900">Login to our platform</h3>
      <form class="space-y-6" action="#">
        <!-- Mail -->
        <div>
          <label for="email" class="block mb-2 text-sm font-bold text-gray-900">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="name@company.com"
            required
          />
        </div>
        <!-- Password -->
        <div>
          <label for="password" class="block mb-2 text-sm font-bold text-gray-900">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <!-- Lost password -->
        <div class="flex justify-end">
          <a href="#" class="text-sm text-blue-700 hover:underline">Lost Password?</a>
        </div>
        <!-- Submit -->
        <button
          type="submit"
          class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Login to your account
        </button>
      </form>
    </div>
  </div>
</template>

<script setup></script>
